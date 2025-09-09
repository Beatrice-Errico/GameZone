import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-pri flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-white text-center mt-0">Accedi</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
