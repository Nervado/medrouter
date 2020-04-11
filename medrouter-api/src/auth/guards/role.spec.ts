function matchRoles(roles: string[], userRoles: string[]): boolean {
  return roles.reduce((p, el) => p && !!userRoles.find(le => le === el), true);
}
describe('Match Roles', () => {
  it('should return a macth', () => {
    const roles = ['admin'];
    const userRoles = ['admin'];

    expect(matchRoles(roles, userRoles)).toBe(true);
  });

  it('should not return a macth', () => {
    const roles = ['admin', 'client'];
    const userRoles = ['admin'];

    expect(matchRoles(roles, userRoles)).toBe(false);
  });
});
