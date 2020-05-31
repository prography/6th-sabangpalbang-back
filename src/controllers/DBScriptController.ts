import {
  JsonController,
  Get,
} from 'routing-controllers';

const csvManager = require('../../module/csvManager')
import { Cocktail } from "../entity/Cocktail";
import { Tag } from "../entity/Tag";
import { CocktailHasTag } from '../entity/CocktailHasTag';
import { Flavor } from '../entity/Flavor';
import { CocktailHasFlavor } from '../entity/CocktailHasFlavor';


@JsonController('/final/dbscripts')
export class DBScriptController {

  @Get('/cocktails')
  public async cocktails() {

    try {
      const cocktailArr = await csvManager.read('cocktailData.csv')

      cocktailArr.forEach(async element => {
        let cocktail = new Cocktail()
        let cocktailName = await Cocktail.find({ where: { name: element.name } });
        if (!cocktailName.length) { //DB에 칵테일 중복값 없으면
          cocktail.img_url = element.img_url
          cocktail.name = element.name
          cocktail.ingredients = element.ingredients
          cocktail.abv = element.abv
          cocktail.abv_classification_idx = element.abv_classification
          if (element.description.length) {
            cocktail.description = element.description
          }
          if (element.non_abv === 1) {
            cocktail.non_abv = 1
          }

          switch (element.base) {
            case "없음":
              cocktail.base_idx = 1;
              break;
            case "데킬라":
              cocktail.base_idx = 2;
              break;
            case "럼":
              cocktail.base_idx = 3;
              break;
            case "진":
              cocktail.base_idx = 4;
              break;
            case "리큐어":
              cocktail.base_idx = 5;
              break;
            case "보드카":
              cocktail.base_idx = 6;
              break;
            case "브랜디":
              cocktail.base_idx = 7;
              break;
            default: //기타
              cocktail.base_idx = 8;
              break;
          }
          console.log(cocktail);
          Cocktail.save(cocktail)
        }
      })
    } catch (err) {
      console.log(err)
    }
    return "cocktail T DBScript complete";
  }


  //Tag T
  @Get('/tags')
  public async tags() {

    try {
      const cocktailArr = await csvManager.read('cocktailData.csv')
      var tagData = []
      cocktailArr.forEach(async element => {
        var tagArr = element.tag.split(', ');
        for (var i = 0; i < tagArr.length; i++) {
          tagData.push(tagArr[i])
        }
        tagData.sort()
        tagData = Array.from(new Set(tagData));
      })
      console.log(tagData)

      tagData.forEach(async element => {
        if (element.length) {
          console.log("element : ", element)
          let dd = await Tag.find({ where: { name: element } });
          if (dd.length == 0) {
            console.log("await Tag.save(tag);");
            let tag = new Tag()
            tag.name = element
            Tag.save(tag);
          }
        }
      })
    } catch (err) {
      console.log(err)
    }
    return "Tag T DBScript complete";
  }



  //Cocktail has tag
  @Get('/cocktailHasTag')
  public async cocktailHasTag() {
    try {
      const cocktailArr = await csvManager.read('cocktailData.csv')
      cocktailArr.forEach(async element => {
        console.log("--- 1 ---")
        const cocktailIdx = (await Cocktail.find({ where: { name: element.name } }))[0].idx
        console.log("cocktailIdx : " + cocktailIdx)

        if (cocktailIdx !== 0) {
          console.log("--- 2 ---")
          var tagArr = element.tag.split(', ')
          tagArr.forEach(async element => {
            let tagIdx = (await Tag.find({ where: { name: element } }))[0].idx
            console.log("tagIdx : " + tagIdx)

            if (cocktailIdx !== 0 && tagIdx !== 0) {
              console.log("--- 3 ---")
              let cocktailHasTag = new CocktailHasTag()
              cocktailHasTag.cocktail_idx = cocktailIdx
              cocktailHasTag.tag_idx = tagIdx
              CocktailHasTag.save(cocktailHasTag)
              console.log("cocktailHasTag save")
            }
          })
        }

      })
    } catch (err) {
      console.log(err)
    }
    return "Tag T DBScript complete";
  }


  //Flavor T
  @Get('/flavors')
  public async flavors() {

    try {
      const cocktailArr = await csvManager.read('cocktailData.csv')
      var flavorData = []
      cocktailArr.forEach(async element => {
        var flavorArr = element.flavor.split(', ');
        for (var i = 0; i < flavorArr.length; i++) {
          flavorData.push(flavorArr[i])
        }
        flavorData.sort()
        flavorData = Array.from(new Set(flavorData));
      })
      console.log(flavorData)

      flavorData.forEach(async element => {
        if (element.length) {
          console.log("element : ", element)
          let dd = await Flavor.find({ where: { name: element } });
          if (dd.length == 0) {
            console.log("await Flavor.save(flavor);");
            let flavor = new Flavor()
            flavor.name = element
            Flavor.save(flavor);
          }
        }
      })
    } catch (err) {
      console.log(err)
    }
    return "Flavor T DBScript complete";
  }




  //Cocktail has flavor
  @Get('/cocktailHasFlavor')
  public async cocktailHasFlavor() {
    try {
      const cocktailArr = await csvManager.read('cocktailData.csv')
      cocktailArr.forEach(async element => {
        console.log("--- 1 ---")
        const cocktailIdx = (await Cocktail.find({ where: { name: element.name } }))[0].idx
        console.log("cocktailIdx : " + cocktailIdx)

        if (cocktailIdx !== 0) {
          console.log("--- 2 ---")
          var flavorArr = element.flavor.split(', ')
          flavorArr.forEach(async element => {
            let flavorIdx = (await Flavor.find({ where: { name: element } }))[0].idx
            console.log("flavorIdx : " + flavorIdx)

            if (cocktailIdx !== 0 && flavorIdx !== 0) {
              console.log("--- 3 ---")
              let cocktailHasFlavor = new CocktailHasFlavor()
              cocktailHasFlavor.cocktail_idx = cocktailIdx
              cocktailHasFlavor.flavor_idx = flavorIdx
              CocktailHasFlavor.save(cocktailHasFlavor)
              console.log("cocktailHasFlavor save")
            }
          })
        }

      })
    } catch (err) {
      console.log(err)
    }
    return "Flavor T DBScript complete";
  }
}