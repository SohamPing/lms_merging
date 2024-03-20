import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useSignup } from "../features/authentication/useSignup";
import { useLogin } from "../features/authentication/useLogin";


function Form({ type }) {
  const navigate = useNavigate();
  const [student, setStudent] = useState(true);
  const [instructor, setInstructor] = useState(false);
  const { signUp, isLoading: isLoadingSingUp } = useSignup();
  const { login, isLoading: isLoadingLogin } = useLogin();
  const { register, handleSubmit, setValue, reset } = useForm();

  

  const onSubmitSignup = (data) => {
    const signUpData = {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      department: data.department,
      type: student ? "student" : "instructor",
      ...(student && { studentData: { level: data.level, courses: data.courses } }),
      ...(instructor && { instructorData: { level: data.level, qualification: data.qualification, courses: data.courses } })
    };

    signUp(signUpData, {
      onSuccess: reset,
    });
  };

  // const onSubmitLogin = async (data) => {
  //   await login({
  //     email: data.email,
  //     password: data.password,
  //   });
  // };


  // const onSubmitLogin = (data) => {
  //   login({
  //     email: data.email,
  //     password: data.password,
  //   }).then(() => {
  //     reset(); // Reset the form fields
  //     navigate('/DuoAuthPage'); // Redirect to Duo Auth page
  //   }).catch((error) => {
  //     console.error("Login error:", error);
  //     // Handle login error (e.g., display an error message)
  //   });
  // };

  const onSubmitLogin = (data) => {
    login({
      email: data.email,
      password: data.password,
    }).then(() => {
      reset(); // Reset the form fields
      navigate('/DuoAuthPage'); // Redirect to Duo Auth page
    }).catch((error) => {
      console.error("Login error:", error);
      // Handle login error (e.g., display an error message)
    });
  };


  


  const onSubmit = type === "login" ? onSubmitLogin : onSubmitSignup;

  return (
    <div className="min-h-screen bg-[#e1eaef] py-10">
      <div>
        <Link to="/">
          <img className="h-12" src="/Logos/coursecraft_logo.png" alt="Coursecraft" />
        </Link>
      </div>
      <div className=" flex flex-col gap-2 justify-center mt-10">
        <div className="bg-[#bee1e6] rounded-3xl flex flex-col items-center w-[500px] m-auto gap-6 pt-5">
          <div className="flex flex-col gap-8">
            <h1 className='text-[35px] text-gray-700' style={{ lineHeight: '75px' }}>
              {type === "login" ? "Sign in to your account" : "Sign up"}
            </h1>
          </div>
          <div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {type === "signup" && (
              <div className="flex items-center flex-col">
                {/* <label className="pl-1 text-[17px] text-gray-700">Signup As:</label> */}
                <div className="flex gap-20 pb-3">
                  <button
                    className={`px-4 py-2 rounded-md ${!student ? 'bg-[#0fa3b1] text-white' : 'bg-[#bee1e6] text-[#0fa3b1] border-2 border-[#0fa3b1]'}`}
                    onClick={() => { setStudent(true); setInstructor(false); }}
                  >
                    Student
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md ${!instructor ? 'bg-[#0fa3b1] text-white' : 'bg-[#bee1e6] text-[#0fa3b1] border-2 border-[#0fa3b1]'}`}
                    onClick={() => { setInstructor(true); setStudent(false); }}
                  >
                    Instructor
                  </button>
                </div>
              </div>
            )}

            </form>
            
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {type === "signup" && (
              <div className="flex flex-col">
                <label className="pl-1 text-[17px] text-gray-700" htmlFor="fullName">
                  Full Name
                </label>
                
                <input
                  className="border-2 py-2 px-4 rounded-md focus:outline-none focus:border-[#0fa3b1]"
                  type="text"
                  placeholder="Enter your Full Name"
                  id="fullName"
                  {...register("fullName", { required: "This field is required" })}
                />
              </div>
            )}
            {type === "signup" && (
              <div className="flex flex-col">
                <label className="pl-1 text-[17px] text-gray-700" htmlFor="department">
                  Department
                </label>
                <input
                  className="border-2 py-2 px-4 rounded-md focus:outline-none focus:border-[#0fa3b1]"
                  type="text"
                  placeholder="Enter your department"
                  id="department"
                  {...register("department", { required: "This field is required" })}
                />
              </div>
            )}
            {/* {type === "signup" && (
              <div className="flex flex-col">
                <label className="pl-1 text-[17px] text-gray-700" htmlFor="level">
                  Level
                </label>
                <select
                  className="border-2 py-2 px-4 rounded-md focus:outline-none focus:border-[#0fa3b1]"
                  id="level"
                  {...register("level", { required: "This field is required" })}
                >
                  <option value="undergrad">Undergraduate</option>
                  <option value="grad">Graduate</option>
                </select>
              </div>
            )}
             */}

{type === "signup" && (
  <div className="flex flex-col">
    <label className="pl-1 text-[17px] text-gray-700" htmlFor="level">
      {instructor ? "Teaching for" : "Level"}
    </label>
    <select
      className="border-2 py-2 px-4 rounded-md focus:outline-none focus:border-[#0fa3b1]"
      id="level"
      {...register("level", { required: "This field is required" })}
    >
      {instructor ? (
        <>
          {/* Optionally, provide different options for instructors */}
          <option value="undergrad">Undergraduate Courses</option>
          <option value="grad">Graduate Courses</option>
        </>
      ) : (
        <>
          <option value="undergrad">Undergraduate</option>
          <option value="grad">Graduate</option>
        </>
      )}
    </select>
  </div>
)}

{type === "signup" && (
  <div className="flex flex-col">
    <label className="pl-1 text-[17px] text-gray-700" htmlFor="courseOption1">
      Course Option-1
    </label>
    <select
      className="border-2 py-2 px-4 rounded-md focus:outline-none focus:border-[#0fa3b1]"
      id="courseOption1"
      {...register("courseOption1", { required: "This field is required" })}
    >
      <option value="Applied Algorithms">Applied Algorithms</option>
      <option value="Software Engineering">Software Engineering</option>
      <option value="Applied Machine Learning">Applied Machine Learning</option>
      <option value="Computer Networks">Computer Networks</option>
      <option value="Data Mining">Data Mining</option>
      <option value="Advanced Database Concepts">Advanced Database Concepts</option>
    </select>
  </div>
)}

{/* Repeat for Course Option-2 */}
{type === "signup" && (
  <div className="flex flex-col">
    <label className="pl-1 text-[17px] text-gray-700" htmlFor="courseOption2">
      Course Option-2
    </label>
    <select
      className="border-2 py-2 px-4 rounded-md focus:outline-none focus:border-[#0fa3b1]"
      id="courseOption2"
      {...register("courseOption2", { required: "This field is required" })}
    >
      <option value="Applied Algorithms">Applied Algorithms</option>
      <option value="Software Engineering">Software Engineering</option>
      <option value="Applied Machine Learning">Applied Machine Learning</option>
      <option value="Computer Networks">Computer Networks</option>
      <option value="Data Mining">Data Mining</option>
      <option value="Advanced Database Concepts">Advanced Database Concepts</option>
      {/* Repeat options as in Course Option-1 */}
    </select>
  </div>
)}

{/* Repeat for Course Option-3 */}
{type === "signup" && (
  <div className="flex flex-col">
    <label className="pl-1 text-[17px] text-gray-700" htmlFor="courseOption3">
      Course Option-3
    </label>
    <select
      className="border-2 py-2 px-4 rounded-md focus:outline-none focus:border-[#0fa3b1]"
      id="courseOption3"
      {...register("courseOption3", { required: "This field is required" })}
    >
      <option value="Applied Algorithms">Applied Algorithms</option>
      <option value="Software Engineering">Software Engineering</option>
      <option value="Applied Machine Learning">Applied Machine Learning</option>
      <option value="Computer Networks">Computer Networks</option>
      <option value="Data Mining">Data Mining</option>
      <option value="Advanced Database Concepts">Advanced Database Concepts</option>
      {/* Repeat options as in Course Option-1 */}
    </select>
  </div>
)}
            {/* {type === "signup" && (
              <div className="flex flex-col">
                <label className="pl-1 text-[17px] text-gray-700" htmlFor="courses">
                  Courses
                </label>
                <input
                  className="border-2 py-2 px-4 rounded-md focus:outline-none focus:border-[#0fa3b1]"
                  type="text"
                  placeholder="Enter your courses"
                  id="courses"
                  {...register("courses", { required: "This field is required" })}
                />
              </div>
            )} */}
            {type === "signup" && instructor && (
              <div className="flex flex-col">
                <label className="pl-1 text-[17px] text-gray-700" htmlFor="qualification">
                  Qualification
                </label>
                <input
                  className="border-2 py-2 px-4 rounded-md focus:outline-none focus:border-[#0fa3b1]"
                  type="text"
                  placeholder="Enter your qualification"
                  id="qualification"
                  {...register("qualification", { required: "This field is required" })}
                />
              </div>
            )}
            <div className="flex flex-col">
              <label className="pl-1 text-gray-500" htmlFor="email">
              <h1 className='text-[18px] text-gray-700'>Email</h1>
              </label>
              <input
                className="border-2 py-2 px-4 rounded-md text-gray-700 focus:outline-none focus:border-[#0fa3b1]"
                type="email"
                placeholder="Enter your email"
                id="email"
                {...register("email", { required: "This field is required" })}
              />
            </div>
            <div className="flex flex-col">
              <label className="pl-1 text-gray-500" htmlFor="password">
              <h1 className='text-[18px] text-gray-700'>Password</h1>
              </label>
              <input
                className="border-2 py-2 px-4 rounded-md mb-2 text-gray-700 focus:outline-none focus:border-[#0fa3b1]"
                type="password"
                placeholder="Enter your password"
                autoComplete="username"
                id="password"
                {...register("password", { required: "This field is required" })}
              />
              {type === "login" && (
                <Link to={"/password-recovery"} className="text-sm text-gray-700 hover:text-[#0fa3b1] pl-2">
                  Forgot Password?
                </Link>
              )}
              
            </div>
            {type === "login" && (
              <div className="flex gap-1.5">
                <input type="checkbox" className="mb-[-10px]" />
                <span className="pt-2">Remember me</span>
              </div>
            )}

            {type === "login" && (
              <button
                className='border-2 border-[#bee1e6] hover:border-[#0fa3b1] rounded-lg '>
                <div className='flex gap-[20px] items-center py-3 px-2'>
                  <img
                    className='w-[35px] h-[35px]'
                    src='/Images/google_logo.png'
                    alt='google-logo'
                  />
                  <span className='text-[#0fa3b1]'>Continue with google</span>
                </div>
              </button>
            )}
            
            <input type="hidden" value={`${type}`} {...register("type", { required: "This field is required" })} />
            <button className="px-32 text-white hover:bg-[#bee1e6] rounded-lg flex py-2 hover:text-[#0fa3b1] bg-[#0fa3b1] border-2 border-[#bee1e6] hover:border-[#0fa3b1]">
              {type === "login" ? "Login" : "Create Account"}
            </button>
            {type === "signup" && (
              <span className="text-sm text-gray-700">
                Already have an account?{" "}
                <Link className="text-[#0fa3b1] pl-2 hover:text-gray-700" to={"/login"}>
                  Sign In
                </Link>
              </span>
            )}
            <p className='text-center text-[#0fa3b1] pb-10'>
                &copy; 2023 CourseCraft. All rights reserved
              </p>
          </form>
        </div>
      </div>
    </div>
    </div>  
  );
}

export default Form;
