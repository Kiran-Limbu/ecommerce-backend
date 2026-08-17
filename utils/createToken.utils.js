import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        });

    //set jwt token into the cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return token;
};

export default generateToken;
