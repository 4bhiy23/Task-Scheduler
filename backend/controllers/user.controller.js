import { createHmac, randomBytes } from "node:crypto";
import { db } from "../db/index.js";
import { usersTable } from "../models/user.models.js";
import { eq } from "drizzle-orm";

export async function addNewUser(req,res){
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({error:"Please provide name, email and password all 3."})
    }

    const [existing] = await db.select({
        email: usersTable.email
    }).from(usersTable).where(eq(usersTable.email, email))

    if(existing){
        return res.status(400).json({error:`User with email: ${email} already exists.`})
    }

    const salt = randomBytes(256).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");


    await db.insert(usersTable).values({
        name,
        email,
        password: hashedPassword,
        salt
    })
    return res.status(201).json({success:`user with email: ${email} added succesfully!`})

}

export async function loginUser(req,res){
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({error:"Please provide email and password both."})
    }

    const [existing] = await db.select({
        name: usersTable.name,
        email: usersTable.email,
        password: usersTable.password,
        salt: usersTable.salt
    }).from(usersTable).where(eq(usersTable.email, email))

    if(!existing){
        return res.status(404).json({error:`User with email: ${email} doesn't exists.`})
    }

    const hashedPassword = createHmac("sha256", existing.salt)
        .update(password)
        .digest("hex");

    if(hashedPassword !== existing.password){
        return res.status(400).json({error:"Wrong Password!"})
    }

    return res.status(200).json({message:`Welcome back ${existing.name}!`})

}

export async function getUserInfo(req,res){
    const id = req.params.id;

    const [user] = await db.select({
        id: usersTable.userId,
        name: usersTable.name,
        email: usersTable.email,
        project: usersTable.project
    }).from(usersTable).where(eq(usersTable.userId, id))

    if(!user){
        return res.status(404).json({error:`User with id: ${id} doesn't exists.`})
    }

    return res.status(200).json(user)

}