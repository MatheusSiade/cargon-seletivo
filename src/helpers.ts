import nookies from 'nookies';
import firebaseAdmin from "./providers/firebase-admin";
import {GetServerSidePropsContext} from "next";

const LOGIN_PAGE = '/login';
const INDEX = '/';

export const checkIfAuthenticated = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    if (cookies.token) {
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      if (token.provider_id === 'anonymous') {
        throw Error();
      } else {
        return {
          props: {token: token},
        };
      }
    } else {
      throw Error();
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: LOGIN_PAGE,
      },
      props: {} as never,
    };
  }
};

export const checkIfNotAuthenticated = async (
  ctx: GetServerSidePropsContext,
) => {
  try {
    const cookies = nookies.get(ctx);
    await firebaseAdmin.auth().verifyIdToken(cookies.token);
    return {
      redirect: {
        permanent: false,
        destination: INDEX,
      },
      props: {} as never,
    };
  } catch (err) {
    return { props: {} as never };
  }
};

