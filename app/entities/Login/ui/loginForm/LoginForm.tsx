import { Formik } from 'formik'
import { Button, Input } from 'react-aria-components'
import * as Yup from 'yup'
import { TProps } from './types'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Неверная почта').required(),
})

export function LoginForm(props: TProps) {
  return (
    <Formik<{ email: string; password: string }>
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) =>
        props.onSubmit({ email: values.email, password: values.password })
      }
    >
      {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
        <div>
          <p>login</p>
          <Input
            type='email'
            value={values.email}
            onBlur={handleBlur('email')}
            onChange={handleChange('email')}
          />
          <p>{errors.email}</p>

          <p>password</p>
          <Input
            type='password'
            value={values.password}
            onBlur={handleBlur('password')}
            onChange={handleChange('password')}
          />
          <p>{errors.password}</p>
          <Button onClick={() => handleSubmit()}>Войти</Button>
        </div>
      )}
    </Formik>
  )
}
