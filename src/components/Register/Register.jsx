import React from 'react';
import validator from 'validator';
import './Register.css';
import logo from '../../images/logo.svg'

const Register = ({onRegister}) => {

  const [formValue, setFormValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isBlockedForm, setBlockedForm] = React.useState(false);

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    if (name === 'email') {
      if (!validator.isEmail(value)) {
        target.setCustomValidity('Некорректый адрес почты');
      } else {
        target.setCustomValidity('');
      }
    }

    if (name === 'name') {
      const re = /^[A-Za-zА-Яа-яЁё\- \s]+$/
        if (!re.test(value)) {
            target.setCustomValidity('Не валидное имя')
        }
        else {
          target.setCustomValidity('')
        }

    }

    setFormValues({ ...formValue, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

    const handleSubmit = async (e) => {
        setBlockedForm(true);
        e.preventDefault();
        await onRegister(formValue.name, formValue.email, formValue.password, setBlockedForm);
    };
    return (
        <div className="register">
            <section className="register__section">
                <a className="register__logo-link" href="/">
                    <img className="register__logo" src={logo} alt="Логотип"/>
                </a>
                <h2 className="register__title">Добро пожаловать!</h2>
                <form
                    style={{pointerEvents: isBlockedForm ? "none" : ""}}
                    onSubmit={handleSubmit}
                    className="register__form"
                    noValidate=""
                >
                    <fieldset className="register__inputs-block">
                        <label className="register__label">
                            <p className="register__placeholder">Имя</p>
                            <input
                                value={formValue.name || ""}
                                onChange={handleInputChange}
                                className="register__input register__input-name"
                                type="text"
                                name="name"
                                placeholder="ваше имя"
                                required
                                minLength="2"
                                maxLength="30"
                            />
                            <span className="register__input-error_active" id="name-error">{errors.name}</span>
                        </label>
                        <label className="register__label">
                            <p className="register__placeholder">E-mail</p>
                            <input
                                value={formValue.email || ""}
                                onChange={handleInputChange}
                                className="register__input register__input-email"
                                type="email"
                                name="email"
                                placeholder="ваша почта"
                                required
                            />
                            <span className="register__input-error_active" id="email-error">{errors.email}</span>
                        </label>
                        <label className="register__label">
                            <p className="register__placeholder">Пароль</p>
                            <input
                                value={formValue.password || ""}
                                onChange={handleInputChange}
                                className="register__input register__input-password"
                                type="password"
                                name="password"
                                placeholder="ваш пароль"
                                required
                            />
                            <span className="register__input-error_active" id="password-error">{errors.password}</span>
                        </label>
                    </fieldset>
                    <div className="register__buttons-block">
                        <p className="register__error"></p>
                        <button
                            disabled = {isValid ? "" : "disabled"}
                            className={isValid ? "register__submit-button" :  "register__submit-button register__submit-button_disabled" }
                            type="submit"
                        >Зарегистрироваться</button>
                        <div className="register__link-block">
                            <p className="register__link register__link-text">Уже зарегистрированы?</p>
                            <a className="register__link" href="/signin">Войти</a>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Register;