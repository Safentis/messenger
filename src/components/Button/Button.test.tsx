import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({ adapter: new Adapter() });

import { shallow } from 'enzyme';
import Button from './Button';

describe('<Button />', () => {
  let component: any;
  let wrapper: any;
  let button: any;

  describe('Standart component', () => {
    beforeEach(() => {
      component = shallow(<Button />);
      wrapper = component;
      button = wrapper.find('button');
    });

    it('JSX element Button exist and it is one', () => {
      expect(button).toHaveLength(1);
    });

    it('JSX element Button has text', () => {
      expect(button.text()).toEqual('');
    });

    it('JSX element Button has className "button"', () => {
      expect(button.hasClass('button')).toEqual(true);
    });
  });

  describe('Standart component', () => {
    beforeEach(() => {
      component = shallow(
        <Button className="simple-exemple" type="button">
          text
          <span>!!!</span>
        </Button>,
      );
      wrapper = component;
      button = wrapper.find('button');
    });

    it('JSX element Button exist and it is one', () => {
      expect(button).toHaveLength(1);
    });

    it('JSX element Button has text', () => {
      expect(button.text()).toEqual('text!!!');
    });

    it('JSX element Button has both classNames "button" and "simple-exemple"', () => {
      expect(button.hasClass('button')).toEqual(true);
      expect(button.hasClass('simple-exemple')).toEqual(true);
    });

    it('JSX element Button has children element <span>', () => {
      expect(wrapper.find('span')).toHaveLength(1);
    });

    it('JSX element Button has attribute type="button"', () => {
      expect(wrapper.find('button').props()['type']).toBe('button');
    });
  });
});
