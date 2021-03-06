import bluebird from 'bluebird'
import factoryGirl from 'factory-girl'

import userFactoryDefine from './user'
import inviteCodeFactoryDefine from './inviteCode'

const factory = factoryGirl.promisify(bluebird)
factory.setAdapter(new factory.ObjectAdapter())

userFactoryDefine(factory)
inviteCodeFactoryDefine(factory)

export default factory
