import Enzyme  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({ adapter: new Adapter() });

import { shallow } from 'enzyme';
import Label from './Label';

describe('<Label />', () => {
    
    let component: any;
    let wrapper  : any;

    describe('Standart component', () => {
        
        beforeEach(() => {
            component = <Label>text</Label>;
            wrapper   = shallow(component);
        });

        it('Component has one label element', () => {
            expect(wrapper.find('label')).toHaveLength(1);
        });

        it('Component has standart class', () => {
            expect(wrapper.find('label').hasClass('label')).toBeTruthy();
        });
        
        it('Component has text content', () => {
            expect(wrapper.find('label').text()).toBe('text');
        });
    });

    describe('Custom component', () => {
        
        beforeEach(() => {
            component = (
                <Label className="label-input-email">
                    text
                    <input value="a"/>
                </Label>
            );
            wrapper   = shallow(component);
        });

        it('We can to add className, example label and label-input-email', () => {
            expect(wrapper.find('label').hasClass('label')).toBeTruthy();
            expect(wrapper.find('label').hasClass('label-input-email')).toBeTruthy();
        });

        it('We can to add children, example input and text', () => {
            expect(wrapper.find('input')).toHaveLength(1);
            expect(wrapper.find('label').text()).toBe('text');
        });
    });
});