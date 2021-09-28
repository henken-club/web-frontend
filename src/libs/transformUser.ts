export const transformUser = <T extends Record<string, unknown>>({
  __typename,
  ...props
}: {__typename: 'User'} & T) => ({...props});
