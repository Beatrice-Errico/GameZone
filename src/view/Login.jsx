import LoginForm from "../components/LoginForm"; // il componente form

const Login = () => {
  return (
    <div className="min-h-screen bg-pri flex items-center justify-center ">
    <div className="max-w-md w-full">
 
      <h1 className="text-2xl font-bold mb-4">Accedi</h1>
      <LoginForm />
      </div>
    </div>
  );
};

export default Login;
