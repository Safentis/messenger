import Enzyme  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({ adapter: new Adapter() });

import { shallow }   from 'enzyme';
import RequestStatus from './RequestStatus';

describe('<RequestStatus />', () => {
    
    describe('Standart component', () => {
        
        it ('', () => {

        });
    });

    describe('Custom component', () => {

        it ('', () => {

        });
    });
});