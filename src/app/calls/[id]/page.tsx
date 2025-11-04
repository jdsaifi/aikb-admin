import { getCallById } from '../../../lib/services/callService';

export default async function CallPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: callId } = await params;
    const call = await getCallById(callId);
    console.log('call: ', call);
    return <div>CallPage {callId}</div>;
}
