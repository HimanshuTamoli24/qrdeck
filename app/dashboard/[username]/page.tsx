export default async function UserDashboardPage({ params }: { params: { username: string } }) {
    const { username } = await params;
    return <div>User Dashboard Page for {username}</div>;
}
