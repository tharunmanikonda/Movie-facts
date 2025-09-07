const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    // Delete all data in order to avoid foreign key constraints
    await prisma.session.deleteMany({})
    console.log('Deleted all sessions')
    
    await prisma.account.deleteMany({})
    console.log('Deleted all accounts')
    
    await prisma.verificationToken.deleteMany({})
    console.log('Deleted all verification tokens')
    
    await prisma.user.deleteMany({})
    console.log('Deleted all users')
    
    console.log('Database has been reset successfully!')
  } catch (error) {
    console.error('Error resetting database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()