import { useState, useRef } from "react"

function App() {

  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  const nomeCompletoRef = useRef()
  const specializzazioneRef = useRef()
  const anniDiEsperienzaRef = useRef()

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:',.<>?/`~";

  function validateUsername(username) {
    if (!username) return "Username obbligatorio"
    if (username.length < 6) return "Minimo 6 caratteri"
    for (let c of username) {
      if (!letters.includes(c) && !numbers.includes(c)) {
        return "Solo caratteri alfanumerici"
      }
    }
    return ""
  }

  function validatePassword(password) {
    if (!password) return "Password obbligatoria"
    if (password.length < 8) return "Minimo 8 caratteri"
    let hasLetters = false
    let hasNumbers = false
    let hasSymbols = false
    for (let c of password) {
      if (letters.includes(c)) hasLetters = true
      else if (numbers.includes(c)) hasNumbers = true
      else if (symbols.includes(c)) hasSymbols = true
    }
    if (!hasLetters) return "Deve contenere almeno una lettera"
    if (!hasNumbers) return "Deve contenere almeno un numero"
    if (!hasSymbols) return "Deve contenere almeno un simbolo"
    return ""
  }

  function validateDescrizione(descrizione) {
    if (!descrizione) return "Descrizione obbligatoria"
    if (descrizione.trim().length < 100) return "Minimo 100 caratteri"
    if (descrizione.trim().length > 1000) return "Massimo 1000 caratteri"
    return ""
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(curr => ({
      ...curr,
      [name]: value
    }))

    let err = "";
    if (name === "username") err = validateUsername(value)
    if (name === "password") err = validatePassword(value)
    if (name === "descrizione") err = validateDescrizione(value)
    setErrors(curr => ({
      ...curr,
      [name]: err
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const nomeCompleto = nomeCompletoRef.current.value
    const specializzazione = specializzazioneRef.current.value
    const anniDiEsperienza = anniDiEsperienzaRef.current.value
    const newErrors = {
      username: validateUsername(formData.username),
      password: validatePassword(formData.password),
      descrizione: validateDescrizione(formData.descrizione)
    }
    setErrors(curr => ({ ...curr, ...newErrors }))


    const datiRaccolti =
      nomeCompleto.trim() !== "" &&
      specializzazione.trim() !== "" &&
      anniDiEsperienza.trim() !== "" &&
      formData.username &&
      formData.password &&
      formData.descrizione

    const erroriDiValidazione = Object.values(newErrors).every(e => !e)

    if (!datiRaccolti || !erroriDiValidazione) {
      console.error("Compila tutti i campi correttamente")
    } else {
      console.log(formData)
      console.log(errors)
    }

  }



  return (
    <>
      <div className="container-fluid ">
        <h1 className="text-center text-primary mt-5">Form controllato</h1>
        <section className="controlled-form m-auto w-50 mt-5">
          <form className="row g-3 border p-5 bg-light"
            onSubmit={(e) => { handleSubmit(e) }}>
            <div className="col-md-4">
              <label className="form-label">Nome Completo</label>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                ref={nomeCompletoRef}

              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="validationCustom02"
                name="username"
                value={formData.username || ""}
                onChange={handleChange}
              />
              {
                errors.username && (
                  <div className="text-danger">{errors.username}</div>
                )
              }
            </div>
            <div className="col-md-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
              />
              {
                errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )
              }
            </div>
            <div className="col-6">
              <label className="form-label">Specializzazione</label>
              <select
                className="form-select"
                id="validationCustom04"
                ref={specializzazioneRef}
              >
                <option value="">
                  Seleziona una specializzazione...
                </option>
                <option>Full-stack</option>
                <option>Front-end</option>
                <option>Back-end</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label">Anni di esperienza</label>
              <input
                type="number"
                className="form-control"
                id="validationCustom03"
                min={0}
                ref={anniDiEsperienzaRef} />
            </div>
            <div className="col-12">
              <label className="form-label">Breve descrizione</label>
              <textarea
                className="form-control"
                id="validationCustom05"
                name="descrizione"
                value={formData.descrizione || ""}
                onChange={handleChange}
                rows={4}
              />
              {
                errors.descrizione && (
                  <div className="text-danger">{errors.descrizione}</div>
                )
              }
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary"
                type="submit">Submit form</button>
            </div>
          </form>

        </section>
      </div >


    </>
  )
}

export default App
