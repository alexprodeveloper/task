export default new class EmployeeService {
    async save(employer) {
        await fetch('/api/employer/save', {
            method: 'PUT',
            body: JSON.stringify(employer),
            headers: { 'Content-type': 'application/json' },
        });
    }
}