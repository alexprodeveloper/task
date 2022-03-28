import './Main.css';
import {useState} from "react";
import SuggestService from "../../services/SuggestService";
import Suggest from "../common/Suggest/Suggest";
import { validate } from 'validate.js';
import EmployeeService from "../../services/EmployeeService";

function Main() {
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [citizenship, setCitizenship] = useState('');
    const [address, setAddress] = useState('');
    const [master, setMaster] = useState('');
    const [job, setJob] = useState('');
    const [phone, setPhone] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [workEmail, setWorkEmail] = useState('');
    const [jobStart, setJobStart] = useState('');
    const [salary, setSalary] = useState('');
    const [deal, setDeal] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isNeedToShowSuggestions, setIsNeedToShowSuggestions] = useState(false);
    const [errors, setErrors] = useState({});
    async function setNeededAddress(address, isNeedToFindSuggestions) {
        if (isNeedToFindSuggestions) {
            let currentSuggestions = await SuggestService.get(address);
            if (currentSuggestions) {
                setSuggestions(currentSuggestions.suggestions);
                setIsNeedToShowSuggestions(true);
            }
        }
        setAddress(address);
    }

   function applyChosenSuggestion(address) {
        setIsNeedToShowSuggestions(false);
        setAddress(address);
   }

   function closeSuggestionIfNeed(event) {
       if (event.keyCode === 27) {
           setIsNeedToShowSuggestions(false);
       }
   }

   async function saveEmployer(event) {
        event.preventDefault();
       const constraints = {
           name: {
               presence: true,
           },
           birth: {
               presence: true,
           },
           citizenship: {
               presence: true,
           },
           address: {
               presence: true,
           },
           master: {
               presence: true,
           },
           job: {
               presence: true,
           },
           phone: {
               presence: true,
           },
           personalEmail: {
               presence: true,
               email: true,
           },
           workEmail: {
               email: true,
           },
           jobStart: {
               presence: true,
           },
           salary: {
               presence: true,
           },
           deal: {
               presence: true,
           },
       };

       const errors = validate(document.querySelector('#form'), constraints) ?? {};
       setErrors(errors);
       console.log()
       if (!Object.keys(errors).length) {
           const employer = {
               name,
               birth,
               citizenship,
               address,
               master,
               job,
               phone,
               personalEmail,
               workEmail,
               jobStart,
               salary,
               deal,
           }
           await EmployeeService.save(employer);
       }
   }
    return (
        <main className="main" onClick={() => setIsNeedToShowSuggestions(false)} tabIndex={0} onKeyDown={(event) => closeSuggestionIfNeed(event)}>
            <div className="avatar" />
            <form id="form" className="content">
                <section className="field__container">
                    <label className="label">ФИО:
                        <input type="text" name="name" className={`input ${errors.name && 'input__error'}`} placeholder="..." value={name} onChange={(event) => setName(event.target.value)} />
                    </label>
                </section>
                <section className="field__container">
                    <label className="label">Дата рождения:
                        <input type="date" name="birth" className={`input ${errors.birth && 'input__error'}`} placeholder="..." value={birth} onChange={(event) => setBirth(event.target.value)} />
                    </label>
                </section>
                <section className="field__container">
                    <label className="label">Гражданство:
                        <input type="text" className={`input ${errors.citizenship && 'input__error'}`} name="citizenship" placeholder="..." value={citizenship} onChange={(event) => setCitizenship(event.target.value)} />
                    </label>
                </section>
                <section className="field__container">
                    <label className="label">Адресс проживания:
                        <input key="address" type="text" name="address" className={`input ${errors.address && 'input__error'}`} placeholder="..." value={address} onChange={(event) => setNeededAddress(event.target.value, true)} />
                    </label>
                    {isNeedToShowSuggestions && (
                        <Suggest key="suggest" suggestions={suggestions} setAddress={applyChosenSuggestion}/>
                    )}
                </section>
                <section className="field__container">
                    <label className="label">Руководитель группы:
                        <input type="text" className={`input ${errors.master && 'input__error'}`} name="master" placeholder="..." value={master} onChange={(event) => setMaster(event.target.value)} />
                    </label>
                </section>
                <section className="field__container">
                    <label className="label">Должность:
                        <input type="text" className={`input ${errors.job && 'input__error'}`} name="job" placeholder="..." value={job} onChange={(event) => setJob(event.target.value)} />
                    </label>
                </section>
                <section className="field__container">
                    <label className="label">Телефон:
                        <input type="text" className={`input ${errors.phone && 'input__error'}`} name="phone" placeholder="..." value={phone} onChange={(event) => setPhone(event.target.value)} />
                    </label>
                </section>
                <section className="field__container">
                    <label className="label">Почта (личная):
                        <input type="text" className={`input ${errors.personalEmail && 'input__error'}`} name="personalEmail" placeholder="..." value={personalEmail} onChange={(event) => setPersonalEmail(event.target.value)} />
                    </label>
                </section>
                <section className="field__container">
                    <label className="label">Почта (рабочая, если есть):
                        <input type="text" className={`input ${errors.workEmail && 'input__error'}`} name="workEmail" placeholder="..." value={workEmail} onChange={(event) => setWorkEmail(event.target.value)} />
                    </label>
                </section>
                <section className="field__container">
                    <label className="label">Дата приема на работу:
                        <input type="date" className={`input ${errors.jobStart && 'input__error'}`} name="jobStart" placeholder="..." value={jobStart} onChange={(event) => setJobStart(event.target.value)} />
                    </label>
                </section>
                <section className="field__container">
                    <label className="label">Размер оплаты труда:
                        <input type="text" className={`input ${errors.salary && 'input__error'}`} name="salary" placeholder="..." value={salary} onChange={(event) => setSalary(event.target.value)} />
                    </label>
                </section>
                <section className="field__container">
                    <label className="label">Оформление:
                        <input type="text" className={`input ${errors.deal && 'input__error'}`} name="deal" placeholder="..." value={deal} onChange={(event) => setDeal(event.target.value)} />
                    </label>
                </section>
                <button className="button" onClick={(event) => saveEmployer(event)}>Сохранить</button>
            </form>
        </main>
    );
}


export default Main;
