import {getSession, signOut} from 'next-auth/react';
import {GetServerSideProps} from 'next';
//@ts-ignore
function User({user}) {
    return (
        <div>
            <h4>User session:</h4>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button onClick={() => signOut({callbackUrl: '/signin'})}>Sign out</button>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps =
    async(context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false
            }
        };
    }
    return {
        props: {user: session.user}
    };
}

export default User;