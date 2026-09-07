export type AdvertisingUserData = {
  email?: string;
  phoneNumber?: string;
};

let rememberedUserData: AdvertisingUserData | null = null;

function normalizeAdvertisingUserData(
  userData: AdvertisingUserData,
): AdvertisingUserData | null {
  const email = userData.email?.trim().toLowerCase();
  const phoneNumber = userData.phoneNumber?.trim();
  const validEmail =
    email &&
    email.length <= 320 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? email
      : undefined;
  const validPhoneNumber =
    phoneNumber && phoneNumber.length <= 32 ? phoneNumber : undefined;

  if (!validEmail && !validPhoneNumber) return null;

  return {
    ...(validEmail ? { email: validEmail } : {}),
    ...(validPhoneNumber ? { phoneNumber: validPhoneNumber } : {}),
  };
}

export function rememberAdvertisingUserData(userData: AdvertisingUserData) {
  rememberedUserData = normalizeAdvertisingUserData(userData);
  return Boolean(rememberedUserData);
}

export function consumeAdvertisingUserData() {
  const userData = rememberedUserData;
  rememberedUserData = null;

  return userData ? { ...userData } : undefined;
}

export function clearAdvertisingUserData() {
  rememberedUserData = null;
}
