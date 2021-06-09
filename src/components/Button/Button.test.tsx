import Enzyme  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({ adapter: new Adapter() });

import { shallow } from 'enzyme';
import Button from './Button';

describe('<Button />', () => {
    let component: any;

    beforeEach(() => {
        component = shallow(<Button />);
    });
    
    describe('Quantity of components', () => {

        it('A length equal to 1', () => {
            expect(component.find('button')).toHaveLength(1);
        });
    });

    describe('Text content', () => {

        it('Standart text of "button"', () => {
            expect(component.find('button').text()).toEqual('button');
        });
    });

    describe('ClassName', () => {

        it('Standart className of "button"', () => {
            expect(component.find('button').hasClass('button')).toEqual(true);
        });
    });
});