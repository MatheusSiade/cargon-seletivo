export const getMessageFromSignInErrorCode = (
  errorCode: string,
): string | undefined => {
  let message;
  switch (errorCode) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      message = 'E-mail ou senha inválidos.';
      break;
    case 'auth/user-disabled':
      message =
        'Sua conta foi desativada. Entre em contato com a administração.';
      break;
    case 'auth/invalid-email':
      message = 'O e-mail fornecido é inválido.';
      break;
  }
  return message;
};
