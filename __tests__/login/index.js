import React from 'react';
import {create} from 'react-test-renderer';
import LoginScreen from '../../src/app/signInScreen';

const tree = create(<LoginScreen />);

jest.runAllTimers();

screenTest('snapshot', ()=>{
    expect(tree).toMatchSnapshot();
})

test('test', ()=>{
    expect(3).toEqual(3);
})