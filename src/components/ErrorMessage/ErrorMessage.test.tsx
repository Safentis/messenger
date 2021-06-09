import Enzyme  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({ adapter: new Adapter() });

import { shallow } from 'enzyme';
import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage />', () => {

    describe(`
        ErrorMessage component with touched false value
        <ErrorMessage error={"Required"} touched={false} />
    `, () => {
        let wrapper  : any;
        let error    : string  = 'Required';
        let touched  : boolean = false;
        let component: any     = <ErrorMessage error={error} touched={touched} />

        beforeEach(() => {
            wrapper = shallow(component);
        });

        it('If error or toched is a false value, then component returns null', () => {
            expect(wrapper.get(0)).toBeNull();
        });
    });

    describe(`
        ErrorMessage component with touched true value
        <ErrorMessage error={"Required"} touched={true} />
    `, () => {
        let wrapper  : any;
        let error    : string  = 'Required';
        let touched  : boolean = true;
        let component: any     = <ErrorMessage error={error} touched={touched} />
    
        beforeEach(() => {
            wrapper = shallow(component);
        });

        it(`
            If error or toched is a true value, then component returns markup,
            div, p, FontAwesomeIcon(svg-icon)
        `, () => {
            expect(wrapper.find('div')).toHaveLength(1);
            expect(wrapper.find('p')).toHaveLength(1);
            expect(wrapper.find('FontAwesomeIcon')).toHaveLength(1);
        });

        it('Element div has className error-message', () => {
            expect(wrapper.find('div').hasClass('error-message')).toBeTruthy();
        });

        it('Element p has className error-message__text', () => {
            expect(wrapper.find('p').hasClass('error-message__text')).toBeTruthy();
        });

        it('Element FontAwesomeIcon has className error-message__icon', () => {
            expect(wrapper.find('FontAwesomeIcon').hasClass('error-message__icon')).toBeTruthy();
        });

        it('Element p has content <FontAwesomeIcon />Required', () => {
            expect(wrapper.find('p').text()).toBe('<FontAwesomeIcon />Required');
        });
    });
});