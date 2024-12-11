import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipent = [{ email }];

  const response = await mailtrapClient.send({
    from: sender,
    to: recipent,
    subject: "Verify Your Email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    ),
    category: "Email Verification",
  });
};

export const sendWelcomeEmail = async (email, name) => {
  const recipent = [{ email }];

  const response = await mailtrapClient.send({
    from: sender,
    to: recipent,
    template_uuid: "d27b784c-e228-400e-8160-343c157eac7e",
    template_variables: {
      company_info_name: "Full-stack MERN",
      name: name,
    },
  });
};

export const sendForgotPasswordEmail = async (email, resetURL) => {
  const recipent = [{ email }];

  const response = await mailtrapClient.send({
    from: sender,
    to: recipent,
    subject: "Password Reset Request",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    category: "Password Reset",
  });
};

export const sendResetPasswordSuccessEmail = async (email) => {
  const recipent = [{ email }];

  const response = await mailtrapClient.send({
    from: sender,
    to: recipent,
    subject: "Password Reset Succesful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    category: "Successful Password Resets",
  });
};
