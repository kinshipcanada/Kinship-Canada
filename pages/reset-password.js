// const { useRouter } = require('next/router');
// import { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabaseClient';
// export default function ResetPassword() {

//     // const router = useRouter();

//     const [loading, setLoading] = useState(false);
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [message, setMessage] = useState('');
    
//     const resetPassword = async (e) => {

//         e.preventDefault();
//         setLoading(true)

//         // Fetch query from path
//         // const path = router.asPath.split('#')[1].split('&');

//         if (password !== confirmPassword) {
//             setError('Passwords do not match');
//             return;
//         }

//         // if (path.length !== 5) {
//         //     setError('Invalid password reset link');
//         //     return;
//         // }

//         // // Get tokens from query
//         // const access_token = path[0].split('=')[1];
//         // const refresh_token = path[1].split('=')[1];
//         // const expires_in = path[2].split('=')[1];
//         // const token_type = path[3].split('=')[1];
//         // const type = path[4].split('=')[1];

//         const { error, data } = await supabase.auth.api.updateUser(access_token, { password : password })
        
//         if (error) {
//             console.error(error)
//             setError(error.description);
//             setLoading(false)
//         } else {
//             setMessage("Successfully reset password");
//             setLoading(false)
//         }

//         // console.log(access_token, refresh_token, expires_in, token_type, type)
//     }

//     return (
//         <div>
//             <div>
//                 <h1 onClick={resetPassword}>Reset Password</h1>
//                 <form onSubmit={resetPassword}>
//                     <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
//                     <input type="password" placeholder='Confirm New Password' onChange = {(e) => setConfirmPassword(e.target.value)} />
//                     {
//                         loading ? "Loading..." :

//                         <button type="submit">Reset Password</button>
//                     }
//                 </form>
//                 { error && <p>{error}</p> }
//                 { message && <p>{message}</p> }
//             </div>
//         </div>
//     )
// }

export default function ResetPassword() {
    return (
        <div>
            <h1>Reset Password</h1>
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder='Confirm New Password' />
            <button type="submit">Reset Password</button>
        </div>
    )
}