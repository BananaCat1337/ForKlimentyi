// @ts-check

import { test } from 'node:test';
import assert from 'assert/strict';
import Validator from '../index.js';

test('step1', () => {
  const v = new Validator();
  const ipAddressSchema = v.ipAddress();

  assert.equal(ipAddressSchema.isValid('27.168.0.1'), true);
  assert.equal(ipAddressSchema.isValid('27.0.0.1'), true);
  assert.equal(ipAddressSchema.isValid('172.16.0.1'), false);
  assert.equal(ipAddressSchema.isValid('8.8.8.8'), false);
  assert.equal(ipAddressSchema.isValid('another.invalid@123.45'), false);
  assert.equal(ipAddressSchema.isValid(15613854), false);
});

test('step2', () => {
  const v = new Validator();

  const ipAddressSchema1 = v.ipAddress();
  assert.equal(ipAddressSchema1.isValid('27.168.0.1'), true);

  const ipAddressSchema2 = v.ipAddress().setIpAddressLengthConstraint(7);
  assert.equal(ipAddressSchema2.isValid('27.0.0.1.4'), true);
  assert.equal(ipAddressSchema2.isValid('192.168'), false);

  const ipAddressSchema3 = v.ipAddress().setIpAddressLengthConstraint(4, 6);
  assert.equal(ipAddressSchema3.isValid('27.16.0'), true);
  assert.equal(ipAddressSchema3.isValid('8.8.8.8'), false);
});

test('step3', () => {
  const v = new Validator();
  const birthdayValidator = v.birthday();

  assert.equal(birthdayValidator.isValid(new Date('1990-01-01')), true);
  assert.equal(birthdayValidator.isValid('1990-01-01'), false);
  assert.equal(birthdayValidator.isValid(new Date('2100-01-01')), false);
  assert.equal(birthdayValidator.isValid(new Date()), true);
});

test('step4', () => {
  const v = new Validator();

  const birthdayValidator1 = v.birthday();
  assert.equal(birthdayValidator1.isValid(new Date('2000-01-01')), true);

  const birthdayValidator2 = v.birthday().setAdultValidator();
  assert.equal(birthdayValidator2.isValid(new Date('2000-01-01')), true);
  assert.equal(birthdayValidator2.isValid(new Date('2010-01-01')), false);
});

test('step5', () => {
  const v = new Validator();
  const userSchema = v.user().shape({
    ipAddress: v.ipAddress().setIpAddressLengthConstraint(7),
    birthday: v.birthday().setAdultValidator(),
  });

  assert.equal(userSchema.isValid({ ipAddress: '27.0.0.1.4', birthday: new Date('2000-01-01') }), true);
  assert.equal(userSchema.isValid({ ipAddress: '30.0.0.1', birthday: '2023-01-01' }), false);
});
