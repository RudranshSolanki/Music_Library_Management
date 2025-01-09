import mongoose from "mongoose";
import { favoriteSchema } from "./favorites.schema.js";

const favoriteModel = mongoose.model('Favorites',favoriteSchema);
export class FavoriteRepository{
    async getFavorites(id,category,limit,offset){
        let populateField = "";
        switch (category) {
            case "artist":
                populateField = { path: "item_id", model: "Artist", select: "name" };
                break;
            case "album":
                populateField = { path: "item_id", model: "Album", select: "name" };
                break;
            case "track":
                populateField = { path: "item_id", model: "Track", select: "name" };
                break;
        }
        const favorites = await favoriteModel.find({user_id:id,category:category}).skip(parseInt(offset)).limit(parseInt(limit)).populate(populateField).exec();
        const formattedFav = favorites.map(fav => ({
            favorite_id: fav._id,
            category: category,
            item_id: fav.item_id._id,
            name: fav.item_id.name
        }));
        return formattedFav;
    }

    async addFavorite(id,category,item_id){
        const newFav = new favoriteModel({category:category,item_id:item_id,user_id:id});
        await newFav.save();
    }

    async deleteFavorite(id,userId){
        await favoriteModel.deleteOne({_id:id,user_id:userId});
    }
}