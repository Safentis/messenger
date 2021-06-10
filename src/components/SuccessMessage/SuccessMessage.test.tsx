import Enzyme  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({ adapter: new Adapter() });

import { shallow }    from 'enzyme';
import SuccessMessage from './SuccessMessage';

describe('<SuccessMessage />', () => {

    describe('Standart component', () => {

        const component = <SuccessMessage />
        const wrapper   = shallow(component);
    
        //* Elements
        it('JSX element SuccessMessage has div', () => {
            expect(wrapper.find('div')).toHaveLength(1);            
        });

        it('JSX element SuccessMessage has p', () => {
            expect(wrapper.find('p')).toHaveLength(1);            
        });
        
        it('JSX element SuccessMessage has element <FontAwesomeIcon />', () => {
            expect(wrapper.find('FontAwesomeIcon')).toHaveLength(1);
        });

        //* Classes
        it('JSX element SuccessMessage has className "success-message"', () => {
            expect(wrapper.find('div').hasClass('success-message')).toBeTruthy();            
        });

        it(`
            JSX element SuccessMessage has both classNames 
            "success-message__text" and "success-message__text_green"
        `, () => {
            expect(wrapper.find('p').hasClass('success-message__text')).toBeTruthy();            
            expect(wrapper.find('p').hasClass('success-message__text_green')).toBeTruthy();            
        });

        //* Text
        it('JSX element SuccessMessage has text with fontawesome icon "<FontAwesomeIcon />Success"', () => {
            expect(wrapper.find('p').text()).toBe('<FontAwesomeIcon />Success');            
        });
    });

    describe('Custom component', () => {
        const component = (
            <SuccessMessage className="custom-class">
                Custom success message
            </SuccessMessage>
        );

        const wrapper   = shallow(component);

        it('JSX element SuccessMessage has className "custom-class"', () => {
            expect(wrapper.find('div').hasClass('custom-class')).toBeTruthy();            
        });

        //* Text
        it('JSX element SuccessMessage has text with fontawesome icon "<FontAwesomeIcon />Custom success message"', () => {
            expect(wrapper.find('p').text()).toBe('<FontAwesomeIcon />Custom success message');            
        });
    });
});