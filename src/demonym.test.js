import React from 'react';
import reactDOM from 'react-dom'


describe('demonym component', ()=>{
  test('render',()=>{
    const {wrapper} = setup()
    expect(wrapper).toMatchSnapshot()
  })
});