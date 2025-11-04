import { auth } from '@/auth';

import { LogoutUserButton } from '../../components/logout-user-button';

export default async function TestAuthPage() {
    const session = await auth();
    console.log('session: ', session);
    return (
        <div>
            TestAuthPage
            <br />
            <LogoutUserButton />
            <br />
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    );
}
