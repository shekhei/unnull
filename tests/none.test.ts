import { Unnull } from "../src";
import {expect} from "chai"

describe('Nome', function () {
    it('unwrap should run defaultCtr', function () {
        let val = Unnull<number>(null);
        expect(val.unwrap(() => 3)).to.equal(3)
    });

    it('map should not run', function () {
        let val = Unnull<number>(null);
        let ran = false;
        expect(val.map(i => {
            ran = true;
            return i+1
        }).unwrap(() => 3)).to.equal(3)
        expect(ran).false
    });

    it('flatmap should run', function () {
        let val = Unnull<number>(null);
        let ran = false;
        expect(val.flatMap(i => {
            ran = true;
            return Unnull(2)
        }).unwrap(() => 3)).to.equal(2)
        expect(ran).true
    });

    it('fold should run defaultCtr', function () {
        let val = Unnull<number>(null);
        let ran = false;
        expect(val.fold(() => "test", i => {
            ran = true;
            return "test2"
        })).to.equal("test")
        expect(ran).false
    });

});