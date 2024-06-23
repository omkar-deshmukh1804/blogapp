
import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from '../conf/conf'

export class Service {
    client = new Client();
    databases; 
    storage; 

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectID)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                slug)
        } catch (error) {
            console.log("Appwrite service error in getPost()", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            await this.databases.listDocuments(conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                queries)
        } catch (error) {
            console.log("Appwrite service error in getPosts()", error);
            return false
        }
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                slug,
                {
                    title, content, featuredImage, status, userId
                }
            )
        } catch (error) {
            console.log("Appwrite service error in createPost()", error);
            return false
        }
    }

    async updatePost({ slug, title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(conf.appWriteDatabaseID,
                conf.appWriteCollectionID, 
                slug, 
                {
                    title, content, featuredImage, status
                }
            )
        } catch (error) {
            console.log("Appwrite service error in updatePost()", error);
            return false
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appWriteDatabaseID,
                conf.appWriteCollectionID, slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service error in deletePost()", error);
            return false  
        }
    }

    //Storage methods 
    async uploadFile(file) {
        try {
            return await this.storage.createFile(conf.appWriteBucketID, ID.unique(), file)
        } catch (error) {
            console.log("Appwrite service error in uploadFile()", error);
            return false   
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(conf.appWriteBucketID, fileId)
           
        } catch (error) {
            console.log("Appwrite service error in deleteFile()", error);
            return false 
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(conf.appWriteBucketID, fileId).href
    }
}

const service = new Service()

export default service;