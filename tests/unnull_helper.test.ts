import { Unnull } from "../src";
import {expect} from "chai"

describe('unnull helper', function () {
    it('should return None when given null or undefined', function () {
        expect(Unnull(null).isNone()).true
        expect(Unnull(undefined).isNone()).true
    });

    it('should return Some when given falsy values other than null and undefined', function () {
        expect(Unnull(false).isSome()).true
        expect(Unnull(0).isSome()).true
        expect(Unnull(NaN).isSome()).true
        expect(Unnull("").isSome()).true
    });
});