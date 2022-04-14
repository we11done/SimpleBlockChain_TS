import * as CryptoJS from 'crypto-js';

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static getHash = (block: Block): string =>
    CryptoJS.SHA256(
      block.index + block.previousHash + block.timestamp + block.data
    ).toString();

  static validateStructure = (block: Block): boolean =>
    typeof block.index === 'number' &&
    typeof block.hash === 'string' &&
    typeof block.previousHash === 'string' &&
    typeof block.timestamp === 'number' &&
    typeof block.data === 'string';

  constructor(
    index: number,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = Block.calculateBlockHash(index, previousHash, timestamp, data);
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const firstBlock: Block = new Block(
  0,
  '',
  'my_1st_block',
  Math.round(new Date().getTime() / 1000)
);

const blockChain: Block[] = [firstBlock];

const getBlockChain = (): Block[] => blockChain;

const getLastBlock = (): Block => blockChain[blockChain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (Block.getHash(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLastBlock())) {
    blockChain.push(candidateBlock);
  }
};

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLastBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newBlock: Block = new Block(
    newIndex,
    previousBlock.hash,
    data,
    newTimeStamp
  );
  addBlock(newBlock);
  return newBlock;
};

createNewBlock('my_2nd_block');
createNewBlock('my_3rd_block');
createNewBlock('my_4th_block');
createNewBlock('my_5th_block');
createNewBlock('my_6th_block');
createNewBlock('my_7th_block');

console.log(getBlockChain());

export {};
