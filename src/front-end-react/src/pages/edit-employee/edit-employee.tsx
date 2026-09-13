import './edit-employee.css';
import { useEffect, useRef, useState, type JSX, type RefObject } from 'react';
import { useLocation } from 'react-router-dom';
import type { Employee } from '../../interfaces/Employee';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import axiosInstance from "../../services/ApiService";
import { Toast } from 'primereact/toast';

type InputFields = 'firstName' | 'lastName' | 'address';
interface ValidationResult {
  isFirstNameValid: boolean;
  isLastNameValid: boolean;
  isAddressValid: boolean;
}

export default function EditEmployee(): JSX.Element {
  const location = useLocation();
  const employee: Employee = (location as any).state.employee;
  const toast: RefObject<Toast | null> = useRef<Toast>(null);

  const invalidMinLength: string = "Min length is 3 symbols.";
  const invalidMaxLength: string = "Max length is 100 symbols.";
  const invalidAddressMaxLength: string = "Max length is 200 symbols.";

  const [firstName, setFirstName] = useState<string>(employee.firstName);
  const [lastName, setLastName] = useState<string>(employee.lastName);
  const [address, setAddress] = useState<string>(employee.address);

  const validationResultDefault: ValidationResult = {
    isFirstNameValid: true,
    isLastNameValid: true,
    isAddressValid: true,
  };

  const [validationResult, setValidationResult] = useState<ValidationResult>(validationResultDefault);

  function validate(field: InputFields): void {
    switch (field) {
      case 'firstName':
        if (firstName.length < 3 || firstName.length > 100) {
          setValidationResult((previous: ValidationResult) => {
            return {
              ...previous,
              isFirstNameValid: false,
            }
          })
        } else {
          setValidationResult((previous: ValidationResult) => {
            return {
              ...previous,
              isFirstNameValid: true,
            }
          })
        }
        break;
      case 'lastName':
        if (lastName.length < 3 || lastName.length > 100) {
          setValidationResult((previous: ValidationResult) => {
            return {
              ...previous,
              isLastNameValid: false,
            }
          })
        } else {
          setValidationResult((previous: ValidationResult) => {
            return {
              ...previous,
              isLastNameValid: true,
            }
          })
        }
        break;
      case 'address':
        if (address.length < 3 || address.length > 200) {
          setValidationResult((previous: ValidationResult) => {
            return {
              ...previous,
              isAddressValid: false,
            }
          })
        } else {
          setValidationResult((previous: ValidationResult) => {
            return {
              ...previous,
              isAddressValid: true,
            }
          })
        }
        break;
      default:
        throw new Error('Invalid input field,');
    }
  }

  async function handleSave(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    if (validationResult.isFirstNameValid === false ||
      validationResult.isLastNameValid === false ||
      validationResult.isAddressValid === false) {
      return;
    }

    const payload: Employee = {
      id: employee.id,
      firstName: firstName,
      lastName: lastName,
      address: address,
    }

    try {
      const response = await axiosInstance.put('/employee', payload);

      if (response.status === 204) {
        toast?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: `Changes saved successfully.`,
          life: 3000,
        });
      }
    } catch (error) {
      toast?.current?.show({
        severity: 'error',
        summary: 'Error!',
        detail: `Unexpected error occurred. Please try again later.`,
        life: 3000,
      });
    }
  }

  useEffect(() => {
    validate('firstName')
  }, [firstName]);

  useEffect(() => {
    validate('lastName')
  }, [lastName]);

  useEffect(() => {
    validate('address')
  }, [address]);

  return <>
    <h1>Edit employee</h1>
    <Toast ref={toast} />
    <form className='edit-form'>
      <div className="form-group">
        <FloatLabel>
          <InputText
            id="firstName"
            className='p-inputtext-lg'
            value={firstName}
            onChange={(e) => {
              setFirstName((_ => {
                return e.target.value;
              }))
            }}
            {... (!validationResult.isFirstNameValid && { invalid: true })}
          />
          <label htmlFor="firstName">First name</label>
        </FloatLabel>
        {!validationResult.isFirstNameValid &&
          <p className='invalid-field'>
            {
              firstName.length < 3
                ? invalidMinLength
                : firstName.length > 100
                  ? invalidMaxLength : ""}
          </p>
        }
      </div>
      <div className="form-group">
        <FloatLabel>
          <InputText
            id="lastName"
            className='p-inputtext-lg'
            value={lastName}
            onChange={(e) => {
              setLastName((_ => {
                return e.target.value;
              }))
            }}
            {... (!validationResult.isLastNameValid && { invalid: true })}
          />
          <label htmlFor="lastName">Last name</label>
        </FloatLabel>
        {!validationResult.isLastNameValid &&
          <p className='invalid-field'>
            {
              lastName.length < 3
                ? invalidMinLength
                : lastName.length > 100
                  ? invalidMaxLength : ""}
          </p>
        }
      </div>
      <div className='form-group'>
        <FloatLabel>
          <InputTextarea id="address"
            value={address}
            onChange={(e) => {
              setAddress(_ => {
                return e.target.value;
              })
            }}
            {... (!validationResult.isAddressValid && { invalid: true })}
            rows={10}
            cols={30}
            autoResize
          />
          <label htmlFor="address">Address</label>
        </FloatLabel>
        {!validationResult.isAddressValid &&
          <p className='invalid-field'>
            {
              address.length > 200
                ? invalidAddressMaxLength
                : ""
            }
          </p>
        }
      </div>
      <Button
        type='button'
        className='save-btn'
        icon={PrimeIcons.SAVE}
        iconPos='right'
        label='Save'
        onClick={(e) => handleSave(e)}>
      </Button>
    </form>
  </>
}
