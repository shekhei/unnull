import { Unnull } from "../src";
import {expect} from "chai"

describe('Some', function () {
    it('unwrap should run and defaultCtr should not run', function () {
        let val = Unnull(1);
        expect(val.unwrap(() => 3)).to.equal(1)
        let value = val.unwrap(() => 2);
        expect(value).to.equal(1)
    });

    it('map should run and map correct value', function () {
        let val = Unnull(1);
        let ran = false;
        expect(val.map(i => {
            ran = true;
            return i+1
        }).unwrap(() => 3)).to.equal(2)
        expect(ran).true
    });

    it('flatmap should run', function () {
        let val = Unnull(1);
        let ran = false;
        expect(val.flatMap(i => {
            ran = true;
            return Unnull(2)
        }).unwrap(() => 3)).to.equal(2)
        expect(ran).true
    });

    it('fold should run and defaultCtr should not run', function () {
        let val = Unnull(1);
        let ran = false;
        expect(val.fold(() => "test", i => {
            ran = true;
            return "test2"
        })).to.equal("test2")
        expect(ran).true
    });

});