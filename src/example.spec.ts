class FriendList {
    friends = [];

    addFriend(name) {
        this.friends.push(name);
        this.announceFriendship(name);
    }

    announceFriendship(name) {
        global.console.log(`${name} is now a friend!`);
    }

    removeFriend(name) {
        const idx = this.friends.indexOf(name);

        if (idx === -1) {
            throw new Error('Friend not found')
        }

        this.friends.splice(idx, 1);
    }
}

// tests
describe('FriendList', () => {

    let friendsList;

    beforeEach(() => {
        friendsList = new FriendList();
    })

    it('initializes friends list', () => {
        // const friendsList = new FriendList();
        expect(friendsList.friends.length).toEqual(0);
    });

    it('adds a friend to the list', () => {
        // const friendList = new FriendList();
        friendsList.addFriend('Ariel');
        expect(friendsList.friends.length).toEqual(1);
    });

    it('announces friendship', () => {
        // const friendList = new FriendList();
        friendsList.announceFriendship = jest.fn();
        expect(friendsList.announceFriendship).not.toHaveBeenCalled();
        friendsList.addFriend('Ariel');
        expect(friendsList.announceFriendship).toHaveBeenCalledWith('Ariel');
    });

    describe('removeFriend', () => {
        it('removes a friend from the list', () => {
            friendsList.addFriend('Ariel')
            expect(friendsList.friends[0]).toEqual('Ariel');
            friendsList.removeFriend('Ariel');
            expect(friendsList.friends[0]).toBeUndefined();
        });

        it('throws an error as friend does not exist', () => {
            expect(() => friendsList.removeFriend('Ariel')).toThrow(new Error('Friend not found'));
        })


    })

});