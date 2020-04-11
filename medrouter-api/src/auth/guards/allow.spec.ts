function allowRoles(roles: string[], userRoles: string[]): boolean {
  return userRoles.some(role => !!roles.find(item => item === role));
}
describe('Match Allow', () => {
  it('should return a macth', () => {
    const roles = ['admin'];
    const userRoles = ['admin'];

    expect(allowRoles(roles, userRoles)).toBe(true);
  });

  it('should not return a macth', () => {
    const roles = ['client', 'admin'];
    const userRoles = ['admin'];

    expect(allowRoles(roles, userRoles)).toBe(true);
  });
});
