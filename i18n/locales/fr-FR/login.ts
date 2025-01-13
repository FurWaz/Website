export default {
    name: 'Connexion',
    title: 'Connectez vous à votre compte FurWaz',
    description: 'Créez un compte FurWaz ou connectez vous pour accéder à votre espace personnel',
    login: 'Connexion',
    register: 'Inscription',
    pseudo: 'Pseudo',
    email: 'Email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmation',
    forgotPassword: {
        message: 'Mot de passe oublié ?',
        title: 'Mot de passe oublié',
        description: 'Réinitialisez le mot de passe de votre compte FurWaz',
        sent: 'Un email de réinitialisation de mot de passe a été envoyé à {email}',
        passwordsDontMatch: 'Les mots de passe ne correspondent pas',
        specifyConfirmPassword: 'Veuillez confirmer le mot de passe',
        newPassword: 'Nouveau mot de passe',
        confirmNewPassword: 'Confirmation',
        invalidToken: 'The token is invalid or has expired'
    },
    verify: {
        title: 'Vérification de l\'email',
        description: 'Vérifier votre adresse mail pour valider votre compte',
        invalidToken: 'Le token est invalide ou a expiré'
    },
    message: {
        specifyPseudo: 'Veuillez spécifier un pseudo',
        specifyEmail: 'Veuillez spécifier un email',
        specifyPassword: 'Veuillez spécifier un mot de passe',
        specifyConfirm: 'Veuillez confirmer le mot de passe',
        passwordMismatch: 'Les mots de passe ne correspondent pas',
        passwordMinLength: 'Le mot de passe doit contenir au moins 8 caractères',
        invalidEmail: 'Email invalide'
    }
};