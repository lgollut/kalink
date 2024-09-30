type MappedVars = Record<string, unknown>;

export const mapContractVars = <TContract extends Record<string, unknown>>(
  contractVars: TContract,
  mapFn: (key: keyof TContract) => MappedVars,
) => {
  return Object.fromEntries(
    Object.keys(contractVars).map((key) => [key, mapFn(key)]),
  ) as Record<keyof TContract, MappedVars>;
};
