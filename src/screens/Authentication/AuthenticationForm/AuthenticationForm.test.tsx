import Enzyme              from 'enzyme';
import Adapter             from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import { shallow        }  from 'enzyme';
import { useFormik      }  from 'formik'; 
import AuthenticationForm  from './AuthenticationForm';

jest.mock('formik');

describe('<AuthenticationForm />', () => {
    //* Props that takes AuthenticationForm
    const formik: any = {
        status: false,
        touched: {
            email: false,
            password: false,
        },
        errors: {
            email: 'email',
            password: 'password',
        },
        initialValue: {
            email: '',
            password: '',
        },
        onSubmit: jest.fn(),
        validationSchema: {},
        getFieldProps: jest.fn(),
        getStatus: jest.fn(),
    }

    
    describe('Quantity of the rendered components', () => {
        let component: any;

        beforeEach(() => {
            component = shallow(<AuthenticationForm formik={formik}/>);
        });
    
        it('Component rendered and has 1 form', () => {
            expect(component.find('form')).toHaveLength(1);
        });
    
        it('Component has 1 requestStatus', () => {
            expect(component.find('RequestStatus')).toHaveLength(1);
        });

        it('Component has 2 labels', () => {
            expect(component.find('Label')).toHaveLength(2);
        });
    
        it('Component has 2 inputs', () => {
            expect(component.find('Input')).toHaveLength(2);
        });

        it('Component has 2 errorMessage', () => {
            expect(component.find('ErrorMessage')).toHaveLength(2);
        });

        it('Component has 1 button', () => {
            expect(component.find('Button')).toHaveLength(1);
        });
    });
});