export const Signup = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return <>
        <div className="row">
            <div className="col-12 col-md-6 align-items-center d-flex flex-column mx-auto vh-100 justify-content-center">
                <form className="form">
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputLastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="exampleInputLastName" aria-describedby="lastNameHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >Submit</button>
                </form>
            </div>
        </div>
    </>
}