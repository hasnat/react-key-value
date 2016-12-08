import { mount, shallow } from 'enzyme';
import React from 'react';
import KeyValue from './key-value';

describe('ReactKeyValue', () => {

  it('should have the proper class name', () => {
    const $ = shallow(<KeyValue />);
    $.hasClass('key-value').should.be.true();
  });

  it('should set the default props', () => {
    const $ = mount(<KeyValue />);
    $.props().rows.length.should.exactly(0);
    $.props().onChange.should.be.a.Function();
  });
  it('should get the initial state from the props', () => {
    const rows = [{ keyItem: 'a', valueItem: 'A' }];
    const $ = mount(<KeyValue rows={ rows } />);
    $.state().rows.should.eql(rows);
  });
  it('should handle adding new rows', () => {
    const $ = shallow(<KeyValue rows={ [{ keyItem: 'a', valueItem: 'A' }] }/>);
    $.instance().handleAddNew();
    $.state('rows').should.eql([
      { keyItem: 'a', valueItem: 'A' },
      { keyItem: '', valueItem: '' }
    ]);
  });
  it('should handle when a key changes', () => {
    const $ = shallow(<KeyValue rows={ [{ keyItem: 'a', valueItem: 'A' }] }/>);
    $.instance().handleKeyItemChange(0, 'z');
    $.state('rows').should.eql([
      { keyItem: 'z', valueItem: 'A' }
    ]);
  });
  it('should handle when a value changes', () => {
    const $ = shallow(<KeyValue rows={ [{ keyItem: 'a', valueItem: 'A' }] }/>);
    $.instance().handleValueItemChange(0, 'Z');
    $.state('rows').should.eql([
      { keyItem: 'a', valueItem: 'Z' }
    ]);
  });
  it('should handle removing a row', () => {
    const $ = shallow(<KeyValue rows={ [{ keyItem: 'a', valueItem: 'A' }] }/>);
    $.instance().handleRemove(0);
    $.state('rows').should.eql([]);
  });
  it('should render the correct amount of rows with the correct content, set by props.rows', () => {
    const $ = mount(
      <KeyValue
        rows={[
          { keyItem: 'a', valueItem: 'A' },
          { keyItem: 'b', valueItem: 'B' }
        ]}
      />
    );
    $.props().rows.length.should.exactly(2);
    $.find('.key-value-row-key-item').at(0).find('input').props().value.should.eql('a');
    $.find('.key-value-row-value-item').at(0).find('input').props().value.should.eql('A');
    $.find('.key-value-row-key-item').at(1).find('input').props().value.should.eql('b');
    $.find('.key-value-row-value-item').at(1).find('input').props().value.should.eql('B');
  });
  it('should render an "Add new" button', () => {
    const $ = shallow(<KeyValue />);
    shallow($.instance().renderAddButton()).is('button').should.be.true();
    shallow($.instance().renderAddButton()).find('button').text().should.eql('Add new');
  });
  it('should render an "Add new" button with a custom method', () => {
    const renderCustomAddButton = () => {
      return(
        <div className="custom-add-button">
          Clicking on this item is pointless!
        </div>
      )
    };
    const $ = shallow(<KeyValue customAddButtonRenderer={ renderCustomAddButton } />);
    shallow($.instance().renderAddButton()).is('div').should.be.true();
    shallow($.instance().renderAddButton()).find('div').text().should.eql('Clicking on this item is pointless!');
  });
});
