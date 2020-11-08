import LinkedListNode from './LinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

export default class LinkedList {
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  prepend(value) {
    const node = new LinkedListNode(value);
    if (this.empty()) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    return this;
  }

  append(value) {
    const node = new LinkedListNode(value);
    if (this.empty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    return this;
  }

  delete(value) {
    if (this.empty()) {
      return null;
    }

    let deletedNode = null;

    // If the head must be deleted then make next node that is differ
    // from the head to be a new head.
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  find({ value = undefined, callback = undefined }) {
    let node = this.head;
    while (node) {
      const matches = callback ? callback(node.value) : this.compare.equal(node.value, value);
      if (matches) {
        return node;
      }
      node = node.next;
    }
    return null;
  }

  deleteTail() {
    const deletedTail = this.tail;
    if (this.head === this.tail || this.empty()) {
      // There is only one node in linked list.
      this.head = null;
      this.tail = null;

      return deletedTail;
    }
    const newTail = this.findLastNodeBefore({ value: this.tail.value });

    newTail.next = null;
    this.tail = newTail;
    return deletedTail;
  }

  deleteHead() {
    if (this.empty()) {
      return null;
    }
    const deletedNode = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deletedNode;
  }

  fromArray(array) {
    array.forEach((el) => this.append(el));
    return this;
  }

  toArray() {
    let node = this.head;
    const result = [];
    while (node) {
      result.push(node);
      node = node.next;
    }
    return result;
  }

  toString(cb) {
    if (this.empty()) {
      return '';
    }
    return this.toArray().map((el) => el.toString(cb)).join(',');
  }

  reverse() {
    let node = this.head;
    const temp = this.tail;
    this.tail = this.head;
    this.head = temp;
    let previousNode = null;
    while (node) {
      const { next } = node;
      node.next = previousNode;
      previousNode = node;
      node = next;
    }
    return this;
  }

  empty() {
    return !this.head;
  }

  findLastNodeBefore({ value = undefined, callback = undefined }) {
    if (this.empty()) {
      return null;
    }
    let node = this.head;
    while (node.next) {
      const matches = callback
        ? callback(node.next.value)
        : this.compare.equal(node.next.value, value);
      if (matches) {
        return node;
      }
      node = node.next;
    }
    return null;
  }
}
