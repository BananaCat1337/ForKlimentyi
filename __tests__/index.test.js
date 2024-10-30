// @ts-check

import { test } from 'node:test';
import assert from 'assert/strict';
import Validator from '../index.js';

test('step1', () => {
  const v = new Validator();
  const isbnNumberSchema = v.isbnNumber();

  assert.equal(isbnNumberSchema.isValid('ISBN_978-0-40615-306-7'), true);
  assert.equal(isbnNumberSchema.isValid('978-0-306-40615-8'), false);
  assert.equal(isbnNumberSchema.isValid('978-0-306-40615-77'), false);
  assert.equal(isbnNumberSchema.isValid('978-0-306-40615'), false);
  assert.equal(isbnNumberSchema.isValid('978-0-306-40615-a'), false);
});

test('step2', () => {
  const v = new Validator();

  const isbnNumberSchema1 = v.isbnNumber();
  assert.equal(isbnNumberSchema1.isValid('ISBN_978-0-40615-306-7'), true);

  const isbnNumberSchema2 = v.isbnNumber().setLengthConstraint(7);
  assert.equal(isbnNumberSchema2.isValid('ISBN_978-0-456'), true);
  assert.equal(isbnNumberSchema2.isValid('ISBN_978-0'), false);

  const isbnNumberSchema3 = v.isbnNumber().setLengthConstraint(4, 6);
  assert.equal(isbnNumberSchema3.isValid('ISBN_978-0'), true);
  assert.equal(isbnNumberSchema3.isValid('978-0-306-40615-7'), false);
});

test('step3', () => {
  const v = new Validator();
  const bookQuantitySchema = v.bookQuantity();

  assert.equal(bookQuantitySchema.isValid(10), true);
  assert.equal(bookQuantitySchema.isValid(0), true);
  assert.equal(bookQuantitySchema.isValid(-5), false);
  assert.equal(bookQuantitySchema.isValid(10.5), false);
  assert.equal(bookQuantitySchema.isValid('10'), false);
});

test('step4', () => {
  const v = new Validator();

  const bookQuantitySchema1 = v.bookQuantity();
  assert.equal(bookQuantitySchema1.isValid(10), true);

  const bookQuantitySchema2 = v.bookQuantity().setBookQuantityRangeConstraint(0, 100);
  assert.equal(bookQuantitySchema2.isValid(50), true);
  assert.equal(bookQuantitySchema2.isValid(150), false);
});

test('step5', () => {
  const v = new Validator();
  const userSchema = v.user().shape({
    isbnNumber: v.isbnNumber().setLengthConstraint(7),
    bookQuantity: v.bookQuantity().setBookQuantityRangeConstraint(0, 100),
  });

  assert.equal(userSchema.isValid({ isbnNumber: 'ISBN_978-0-456', bookQuantity: 50 }), true);
  assert.equal(userSchema.isValid({ isbnNumber: '978-0-306-40615-7', bookQuantity: 144444 }), false);
});
