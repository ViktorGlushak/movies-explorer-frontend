import React from 'react';
import './Profile.css'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import validator from "validator";
const Profile = ({logOut, handleUpdateUser}) => {

    const [isRedacted, setRedacted] = React.useState(false);
    const [oldName, setOldName] = React.useState(false);
    const [oldEmail, setOldEmail] = React.useState(false);
    const [isBlockedForm, setBlockedForm] = React.useState(false);
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setOldName(currentUser.name)
        setOldEmail(currentUser.email)
    setFormValues({name: currentUser.name, email: currentUser.email})
  }, [currentUser]);

  const [formValue, setFormValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    if (name === 'email') {
      if (!validator.isEmail(value)) {
        target.setCustomValidity('Некорректый адрес почты');
      } else if(value === oldEmail) {
            target.setCustomValidity('Почта совпадает с предыдущей')
        }else {
        target.setCustomValidity('');
      }
    }

    if (name === 'name') {
      const re = /^[A-Za-zА-Яа-яЁё\- \s]+$/
        if (!re.test(value)) {
            target.setCustomValidity('Не валидное имя')
        }
        else if(value === oldName) {
            target.setCustomValidity('Имя совпадает с предыдущим')
        }
        else {
          target.setCustomValidity('')
        }

    }

    setFormValues({ ...formValue, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

    function handleSubmit(e) {
    setBlockedForm(true);
    e.preventDefault();
    handleUpdateUser({
      name: formValue.name,
      email: formValue.email,
    }, setBlockedForm);
  }

  function handleSwitch(e) {
    e.preventDefault();
    setRedacted(!isRedacted);
  }

    return (
    <form
        style={{pointerEvents: isBlockedForm ? "none" : ""}}
        onSubmit={handleSubmit}
        className="profile register"
        noValidate=""
    >
        <h2 className="profile__title">Привет, {formValue.name}!</h2>
        <fieldset className="profile__inputs-block">
            <label className="profile__label">
                <p className="profile__placeholder">Имя</p>
                <input
                    disabled = {isRedacted ? "" : "disabled"}
                    onChange={handleInputChange}
                    className="profile__input"
                    type="text"
                    name="name"
                    placeholder="ваше имя"
                    required
                    minLength="2"
                    maxLength="30"
                    value={formValue.name || ""}
                />
                <span className="register__input-error_active" id="name-error">{errors.name}</span>
            </label>
            <label className="profile__label">
                <p className="profile__placeholder">E-mail</p>
                <input
                    disabled = {isRedacted ? "" : "disabled"}
                    onChange={handleInputChange}
                    className="profile__input"
                    type="email"
                    name="email"
                    placeholder="ваша почта"
                    required
                    value={formValue.email || ""}
                />
                <span className="register__input-error_active" id="email-error">{errors.email}</span>
            </label>
        </fieldset>
        {
            isRedacted
                ?
            <div className="save__buttons-block">
                <p className="save__error"></p>
                <button
                    type="submit"
                    disabled={isValid ? "" : "disabled"}
                    className={isValid ? "save__submit-button" :  "register__submit-button register__submit-button_disabled" }
                >Сохранить</button>
            </div>
                :
            <div className="profile__buttons-block">
            <p className="register__error profile__error"></p>
                <button
                    className="profile__edit-button profile__edit-button_disabled"
                    type="button"
                    onClick={handleSwitch}
                >Редактировать</button>
            <a href="/">
                <button
                    onClick={logOut}
                    className="profile__signout-button"
                >Выйти из аккаунта</button>
            </a>
            </div>
        }
    </form>
    );
};

export default Profile;