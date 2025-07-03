import { useState } from "react"

function App() {

  const [formData, setFormData] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(curr => ({
      ...curr,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const datiNecessari = [
      "nomeCompleto",
      "username",
      "password",
      "specializzazione",
      "anniDiEsperienza",
      "descrizione"
    ]
    const datiRaccolti = datiNecessari.every(d => formData[d] && formData[d].toString().trim() !== "")
    if (!datiRaccolti) {
      console.error("Compila tutti i campi")
    } else {
      console.log(formData)
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
                name="nomeCompleto"
                value={formData.nomeCompleto || ""}
                onChange={handleChange}
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
            </div>
            <div className="col-md-4">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  id="validationCustomUsername"
                  aria-describedby="inputGroupPrepend"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-6">
              <label className="form-label">Specializzazione</label>
              <select
                className="form-select"
                id="validationCustom04"
                name="specializzazione"
                value={formData.specializzazione || ""}
                onChange={handleChange}

              >
                <option value="" disabled>
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
                name="anniDiEsperienza"
                value={formData.anniDiEsperienza || ""}
                onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="form-label">Breve descrizione</label>
              <input
                type="text-area"
                className="form-control"
                id="validationCustom05"
                name="descrizione"
                value={formData.descrizione || ""}
                onChange={handleChange}
              />
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
