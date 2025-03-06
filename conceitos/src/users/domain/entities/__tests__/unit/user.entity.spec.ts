import { faker } from '@faker-js/faker';
import { UserEntity, UserProps } from '../../user.entity';
describe('UserEntity', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    sut = new UserEntity(props);
  });

  it('Constructor methos', () => {
    expect(sut.props.name).toStrictEqual(props.name);
    expect(sut.props.email).toStrictEqual(props.email);
    expect(sut.props.password).toStrictEqual(props.password);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of name field', () => {
    expect(sut.props.name).toBeDefined();
    expect(sut.props.name).toStrictEqual(props.name);
    expect(typeof sut.props.name).toStrictEqual('string');
  });

  it('Getter of email field', () => {
    expect(sut.props.email).toBeDefined();
    expect(sut.props.email).toStrictEqual(props.email);
    expect(typeof sut.props.email).toStrictEqual('string');
  });

  it('Getter of password field', () => {
    expect(sut.props.password).toBeDefined();
    expect(sut.props.password).toStrictEqual(props.password);
    expect(typeof sut.props.password).toStrictEqual('string');
  });

  it('Getter of createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });
});
