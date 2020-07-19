import { Get, JsonController, Param, Post, QueryParam } from 'routing-controllers'
import { Cocktail, CocktailData } from '../entity/Cocktail'
import { Between, getConnectionManager, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm'
import { BadRequestError } from '../http-errors/BadRequestError'
import { Base, BaseData } from '../entity/Base'
import { AbvClassification, AbvClassificationData } from '../entity/AbvClassification'
import { Tag, TagData } from '../entity/Tag'
import { Flavor, FlavorData } from '../entity/Flavor'

@JsonController('/cocktails')
export class CocktailController {
  private cocktailRepository: Repository<Cocktail>;

  constructor() {
    this.cocktailRepository = getConnectionManager().get().getRepository(Cocktail)
  }

  @Post('/init')
  async initCocktail() {
    const csvManager = require('../../module/csvManager')

    const NON_BASE_TEXT = '없음'
    const ANOTHER_BASE_TEXT = '기타'

    async function initData() {
      try {
        await insertAbvClassification()
        await insertBase()
        await insertTagData()
        await insertFlavors()
        const nonBase = await Base.findDataForCocktail(NON_BASE_TEXT)
        const anotherBase = await Base.findDataForCocktail(ANOTHER_BASE_TEXT)
        const cocktailArr = await csvManager.read('cocktailData.csv')
        for (const element of cocktailArr) {
          const cocktailName = await Cocktail.findOneByName(element.name)
          if (!cocktailName) { // DB에 칵테일 중복값 없으면
            // 도수 분류 정보
            const abvClassification =
              await AbvClassification.findDataForCocktail(element.abv)
            // 베이스 정보
            let base
            if (element.base === NON_BASE_TEXT) {
              base = nonBase
            } else {
              const baseData = await Base.findDataForCocktail(element.base)
              // 베이스가 검색되지 않으면 기타
              if (!baseData) {
                base = anotherBase
              } else {
                base = baseData
              }
            }
            // 태그 정보
            const tagList = []
            const tagNameArr = element.tag.split(', ')
            for (let i = 0; i < tagNameArr.length; i++) {
              const tagName = tagNameArr[i].trim()
              const tag = await Tag.findByName(tagName)
              tagList.push(tag)
            }
            // 맛 정보
            const flavorList = []
            const flavorNameArr = element.flavor.split(', ')
            for (let i = 0; i < flavorNameArr.length; i++) {
              const flavorName = flavorNameArr[i].trim()
              const flavor = await Flavor.findByName(flavorName)
              flavorList.push(flavor)
            }
            const cocktailData: CocktailData = {
              name: element.name,
              imgUrl: element.img_url,
              ingredients: element.ingredients,
              abv: element.abv,
              description: element.description,
              nonAbv: element.nonAbv === 1,
              abvClassification,
              base,
              flavors: flavorList,
              tags: tagList,
              backgroundImgUrl: element.img_url,
            }
            await Cocktail.saveData(cocktailData)
          }
        }
      } catch (err) {
        console.log(err)
      }
      console.log('cocktail T DBScript complete')
    }

    async function insertAbvClassification() {
      console.log('--- START INIT ABV CLASSIFICATION ---')
      // TODO: desc 정하기
      const abvDesc = ['엥', '맥주~', '청하', '참이슬', '말리부', '리큐르', '예거', '앱솔루트', '오우..']
      for (let i = 0; i <= 40; i += 5) {
        const abvClassificationData: AbvClassificationData = {
          minAbv: i,
          maxAbv: i + 4,
          description: abvDesc[i / 5],
        }
        if (i === 40) {
          abvClassificationData.maxAbv = 100
          await AbvClassification.saveData(abvClassificationData)
          continue
        }
        await AbvClassification.saveData(abvClassificationData)
      }
      console.log('--- COMPLETE INIT ABV CLASSIFICATION ---')
    }

    async function insertBase() {
      console.log('--- START INIT BASE ---')
      const baseNameList = ['없음', '데킬라', '럼', '진', '리큐어', '보드카', '브랜디', '기타']
      const baseImgList = [
        'https://user-images.githubusercontent.com/49062985/83237242-cd20c300-a1cf-11ea-9f36-a3b52345d9bc.jpg',
        'https://user-images.githubusercontent.com/49062985/83227021-2ed83180-a1be-11ea-81f7-93c3eb99ba67.jpg',
        'https://user-images.githubusercontent.com/49062985/82726176-39597d80-9d1d-11ea-8c90-090fe67b352e.png',
        'https://user-images.githubusercontent.com/49062985/82726234-99e8ba80-9d1d-11ea-81f2-f13be5559a8b.png',
        'https://user-images.githubusercontent.com/49062985/83226553-38ad6500-a1bd-11ea-886d-ace9026ed754.jpg',
        'https://user-images.githubusercontent.com/49062985/83226647-6692a980-a1bd-11ea-9eec-a546a97c5229.jpg',
        'https://user-images.githubusercontent.com/49062985/83226713-90e46700-a1bd-11ea-91b0-9735fad7e361.jpg',
        'https://user-images.githubusercontent.com/49062985/83226826-ca1cd700-a1bd-11ea-859c-c1e2362111b0.jpg',
      ]
      const baseTextColorList = [
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
      ]
      const baseBackgroundColorList = [
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
      ]
      const i = 0
      for (const baseName of baseNameList) {
        // TODO: 도수, 설명 추가
        const baseData: BaseData = {
          imgUrl: baseImgList[i],
          name: baseName,
          abv: 40,
          description: '',
          textColor: baseTextColorList[i],
          backgroundColor: baseBackgroundColorList[i],
        }
        await Base.saveData(baseData)
      }
      console.log('--- COMPLETE INIT BASE ---')
    }

    async function insertTagData() {
      console.log('--- START INIT TAG ---')
      try {
        const cocktailArr = await csvManager.read('cocktailData.csv')
        const tagData: Array<string> = []
        for (const element of cocktailArr) {
          const tagArr = element.tag.split(', ')
          for (let i = 0; i < tagArr.length; i++) {
            const tagName = tagArr[i].trim()
            if (tagName.length && !tagData.includes(tagName)) {
              tagData.push(tagName)
            }
          }
        }

        for (const tagName of tagData) {
          const isAlreadyTagData = await Tag.findByName(tagName)
          if (!isAlreadyTagData) {
            const tagData: TagData = { name: tagName }
            await Tag.saveData(tagData)
          }
        }
      } catch (err) {
        console.log(err)
      }
      console.log('--- COMPLETE INIT TAG ---')
    }

    // Flavor T
    async function insertFlavors() {
      console.log('--- START INIT FLAVORS ---')
      try {
        const cocktailArr = await csvManager.read('cocktailData.csv')
        const flavorData = []
        for (const element of cocktailArr) {
          const flavorArr = element.flavor.split(', ')
          for (let i = 0; i < flavorArr.length; i++) {
            const flavorName = flavorArr[i].trim()
            if (flavorName.length && !flavorData.includes(flavorName)) {
              flavorData.push(flavorName)
            }
          }
        }

        for (const flavorName of flavorData) {
          const isAlreadyFlavorData = await Flavor.findByName(flavorName)
          if (!isAlreadyFlavorData) {
            const flavorData: FlavorData = {
              name: flavorName,
              description: '향 설명',
            }
            await Flavor.saveData(flavorData)
          }
        }
      } catch (err) {
        console.log(err)
      }
      console.log('--- COMPLETE INIT FLAVORS ---')
    }

    await initData()
  }

  @Get('/')
  async getCocktailList(
    @QueryParam('name') name: string,
    @QueryParam('offset') offset: number,
    @QueryParam('limit') limit: number,
    @QueryParam('abvMin') abvMin: number,
    @QueryParam('abvMax') abvMax: number,
    @QueryParam('abvSort') abvSort: string,
  ) {
    if (offset && !limit) {
      throw new BadRequestError('offset 값은 limit 없이 사용할 수 없습니다.')
    }
    const where: any = {}
    if (name) where.name = Like(`%${name}%`)
    if (abvMin !== undefined && abvMax !== undefined) {
      where.abv = Between(abvMin, abvMax)
    }
    if (abvMin !== undefined && abvMax == undefined) {
      where.abv = MoreThanOrEqual(abvMin)
    }
    if (abvMin == undefined && abvMax !== undefined) {
      where.abv = LessThanOrEqual(abvMax)
    }
    const order: any = {}
    if (abvSort) {
      if (abvSort == 'ASC' || abvSort == 'DESC') {
        order.abv = abvSort
      } else {
        throw new BadRequestError('도수 정렬 값은 ASC 혹은 DESC만 가능합니다.')
      }
    }
    const cocktails = await this.cocktailRepository.find({
      where,
      relations: ['tags', 'flavors', 'base', 'abvClassification'],
      take: limit,
      skip: offset,
      order,
    })
    return { cocktails }
  }

  @Get('/random')
  async getCocktailRandom() {
    const [cocktails, cocktailCount] = await this.cocktailRepository.findAndCount()
    return await this.cocktailRepository.findOne({
      where: {
        idx: Math.floor(Math.random() * (cocktailCount - 1)) + 1,
      },
      relations: ['tags', 'flavors', 'base', 'abvClassification'],
    })
  }

  @Get('/:cocktailIdx')
  async getCocktailDetail(@Param('cocktailIdx') cocktailIdx: string) {
    const cocktails = await this.cocktailRepository.findOne({
      where: {
        idx: cocktailIdx,
      },
      // TODO: 유저 정보 return 일부만 되게 수정
      relations: ['tags', 'flavors', 'base', 'abvClassification', 'reviews', 'reviews.user', 'likes'],
    })
    return cocktails
  }
}
